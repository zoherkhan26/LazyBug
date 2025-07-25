import { ChevronRight } from "lucide-react";
import React from "react";
import { useLocation, Link } from "react-router-dom";

export const BreadCrumb = () => {
  const location = useLocation();

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  const buildPath = (index) => `/${pathSegments.slice(0, index + 1).join("/")}`;

  const formatSegment = (segment) =>
    decodeURIComponent(segment.charAt(0).toUpperCase() + segment.slice(1));

  return (
    <div className="flex items-center space-x-1 md:space-x-2  text-xs md:text-base  ">
      {pathSegments.map((segment, index) => {
        const path = buildPath(index);
        const isLast = index === pathSegments.length - 1;

        return (
          <React.Fragment key={path}>
            {index > 0 && <ChevronRight className="w-4 h-4 text-gray-500" />}

            {isLast ? (
              <span className="text-faded font-medium  text-sm">
                {formatSegment(segment)}
              </span>
            ) : (
              <Link
                to={path}
                className="text-faded font-medium hover:text-black text-sm"
              >
                {formatSegment(segment)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
