import React from "react";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface SoldIndicatorProps {
  sold: number;
}

const SoldIndicator: React.FC<SoldIndicatorProps> = ({ sold }) => {
  // Use only supported variants: "default", "secondary", "outline"
  const getSoldVariant = () => {
    if (sold === 0) return "secondary";
    if (sold < 10) return "outline";
    return "default";
  };

  const getSoldText = () => {
    if (sold === 0) return "No sales yet";
    if (sold < 10) return `Sold ${sold}`;
    return `Hot! ${sold} sold`;
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <TrendingUp className="h-4 w-4 text-muted-foreground" />
      <Badge variant={getSoldVariant()}>{getSoldText()}</Badge>
    </div>
  );
};

export default SoldIndicator;
