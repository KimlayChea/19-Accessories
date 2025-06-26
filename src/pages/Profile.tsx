import React, { useState, useRef } from "react";
import { useUser } from "@/contexts/UserContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

import { Sun, Moon, User, Upload, LogOut, Lock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import OrderHistory from "@/components/OrderHistory";
import { useUpdateUser } from "@/customs/hooks/authentication/useUpdateUser"; // Assuming you have a custom hook for updating user data
import { useAuthUser } from "@/customs/hooks/authentication/useAuthUser";
import { useUpdateAvatar } from "@/customs/hooks/authentication/useUpdateAvatar";
import { useLogout } from "@/customs/hooks/authentication/useLogout";
import { useVerifyCurrentPassword } from "@/customs/hooks/authentication/useVerifyCurrentPassword";
import { useToast } from "../components/ui/use-toast"; // Adjust the import path based on your project structure

const Profile = () => {
  const { toast } = useToast();

  const { user: authUser } = useAuthUser();
  const { updateUser } = useUpdateUser();
  const { verifyCurrentPassword } = useVerifyCurrentPassword();
  const { updateAvatar, isUpdating } = useUpdateAvatar();
  const { logout } = useLogout();

  const { isDarkMode, toggleDarkMode } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    defaultValues: {
      name: authUser?.user_metadata?.fullName,
      email: authUser?.user_metadata?.email,
      expressDelivery: authUser?.user_metadata?.expressDelivery || "",
      address: authUser?.user_metadata?.address || "",
      phone: authUser?.user_metadata?.phoneNumber || "",
    },
  });

  const passwordForm = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = ({ name, address, phone, expressDelivery }) => {
    if (!name || !address || !phone || !expressDelivery) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Please fill in all fields!",
      });
      return;
    }
    if (phone && !/^\d{9}$/.test(phone)) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Phone number must be 10 digits!",
      });
      return;
    }
    if (address && address.length < 5) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Address must be at least 5 characters long!",
      });
      return;
    }
    if (name && name.length < 3) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Name must be at least 3 characters long!",
      });
      return;
    }

    updateUser({
      fullName: form.getValues("name"),
      address: form.getValues("address"),
      phoneNumber: form.getValues("phone"),
      expressDelivery: form.getValues("expressDelivery"),
    });

    setIsEditing(false);
  };

  const onPasswordSubmit = (data) => {
    // Basic validation
    if (data.newPassword !== data.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "New passwords do not match!",
      });
      return;
    }

    if (data.newPassword.length < 8) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Password must be at least 8 characters long!",
      });
      return;
    }

    if (!data.currentPassword) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Please enter your current password!",
      });

      return;
    }

    verifyCurrentPassword(
      {
        email: authUser.user_metadata.email,
        currentPassword: data.currentPassword,
      },
      {
        onSuccess: () => {
          updateUser({ password: data.newPassword });

          setIsChangingPassword(false);
          passwordForm.reset();
        },
        onerror: () => {
          passwordForm.reset();
        },
      }
    );
  };

  const handleLogout = () => {
    logout();

    toast({
      title: "User logged out",
      description: "Logged out successfully!",
    });
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Profile update failed",
        description: "Please select a valid image file (JPEG, PNG, GIF, WEBP)",
      });
      return;
    }

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "Profile update failed",
        description: "Image is too large. Maximum size is 2MB",
      });
      return;
    }

    updateAvatar(file);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Personal Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your account details here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" disabled={true} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="expressDelivery"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Express Delivery</FormLabel>
                          <FormControl>
                            <div className="flex flex-col gap-2">
                              <label
                                htmlFor="standard"
                                className="flex items-center"
                              >
                                <input
                                  type="radio"
                                  id="standard"
                                  value="Standard (for those who live in Phnom Penh)"
                                  checked={
                                    field.value ===
                                    "Standard (for those who live in Phnom Penh)"
                                  }
                                  onChange={() =>
                                    field.onChange(
                                      "Standard (for those who live in Phnom Penh)"
                                    )
                                  }
                                />
                                <span className="ml-2">
                                  Standard (for those who live in Phnom Penh)
                                </span>
                              </label>
                              <label
                                htmlFor="virakbuntham"
                                className="flex items-center"
                              >
                                <input
                                  type="radio"
                                  id="virakbuntham"
                                  value="Virak Buntham"
                                  checked={field.value === "Virak Buntham"}
                                  onChange={() =>
                                    field.onChange("Virak Buntham")
                                  }
                                />
                                <span className="ml-2">Virak Buntham</span>
                              </label>
                              <label
                                htmlFor="jtexpress"
                                className="flex items-center"
                              >
                                <input
                                  type="radio"
                                  id="jtexpress"
                                  value="J&T Express"
                                  checked={field.value === "J&T Express"}
                                  onChange={() => field.onChange("J&T Express")}
                                />
                                <span className="ml-2">J&T Express</span>
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} type="tel" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-4 pt-2">
                      <Button type="submit">Save Changes</Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Full Name
                    </h3>
                    <p className="text-base">
                      {authUser.user_metadata?.fullName}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Email
                    </h3>
                    <p className="text-base">{authUser.user_metadata?.email}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Express Delivery By
                    </h3>
                    <p className="text-base">
                      {authUser.user_metadata?.expressDelivery}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Address
                    </h3>
                    <p className="text-base">
                      {authUser.user_metadata?.address}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Phone Number
                    </h3>
                    <p className="text-base">
                      {authUser.user_metadata?.phoneNumber}
                    </p>
                  </div>

                  <Button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Password Update Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Change Password
              </CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isChangingPassword ? (
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-4 pt-2">
                      <Button type="submit">Update Password</Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsChangingPassword(false);
                          passwordForm.reset();
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Password
                    </h3>
                    <p className="text-base">••••••••••••</p>
                  </div>

                  <Button onClick={() => setIsChangingPassword(true)}>
                    Change Password
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order History Card */}
          <OrderHistory />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {isDarkMode ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                </div>
                <Switch
                  id="dark-mode"
                  checked={isDarkMode}
                  onCheckedChange={toggleDarkMode}
                />
              </div>

              <div className="pt-2 border-t">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to logout?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        You will be signed out of your account and redirected to
                        the home page.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout}>
                        Yes, logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div
                onClick={handleAvatarClick}
                className="cursor-pointer relative group"
              >
                <Avatar className="w-24 h-24">
                  {authUser.user_metadata.avatar ? (
                    <AvatarImage
                      className="object-cover"
                      src={authUser.user_metadata.avatar}
                      alt={authUser.user_metadata.fullName}
                    />
                  ) : null}

                  <AvatarFallback className="text-2xl bg-muted">
                    {authUser.user_metadata.fullName ? (
                      authUser.user_metadata.fullName?.[0].toUpperCase()
                    ) : (
                      <User />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload className="h-8 w-8 text-white" />
                </div>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUpdating}
              />

              <Button
                variant="outline"
                className="mt-4"
                onClick={handleAvatarClick}
                disabled={isUpdating}
              >
                {isUpdating ? "Uploading..." : "Change Picture"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
