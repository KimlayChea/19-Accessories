import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Award, Shield, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About 19 Accessories</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're passionate about bringing you the latest fashion trends with
            quality, style, and affordability at the heart of everything we do.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
          <div className="prose prose-lg mx-auto text-gray-700">
            <p className="mb-4">
              Founded in 2020, Central Plan started as a small dream to make
              fashion accessible to everyone. Our founders noticed a gap in the
              market for trendy, high-quality clothing that didn't break the
              bank.
            </p>
            <p className="mb-4">
              Today, we've grown into a trusted fashion destination, serving
              thousands of customers worldwide. We believe that everyone
              deserves to look and feel their best, regardless of their budget
              or style preferences.
            </p>
            <p>
              Our team works tirelessly to source the best materials, work with
              ethical manufacturers, and bring you collections that reflect the
              latest trends while maintaining timeless appeal.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle className="text-lg">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">
                  Building a community of fashion lovers who support and inspire
                  each other.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle className="text-lg">Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">
                  Committed to delivering products that meet the highest
                  standards of quality and craftsmanship.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle className="text-lg">Trust</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">
                  Building lasting relationships through transparency,
                  reliability, and exceptional service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Heart className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle className="text-lg">Passion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">
                  Driven by our love for fashion and dedication to helping you
                  express your unique style.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
          <Card>
            <CardContent className="p-8">
              <blockquote className="text-xl italic text-center text-gray-700">
                "To democratize fashion by making stylish, high-quality clothing
                accessible to everyone, while building a sustainable and
                inclusive fashion ecosystem that celebrates individual
                expression."
              </blockquote>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="text-3xl font-bold text-primary mb-2">50K+</h3>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-primary mb-2">1000+</h3>
            <p className="text-gray-600">Products</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-primary mb-2">98%</h3>
            <p className="text-gray-600">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
