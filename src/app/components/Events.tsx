"use client";

import React from "react";

interface EventsProps {
  isExpanded: boolean;
}

export default function Events({ isExpanded }: EventsProps) {
  return isExpanded ? (
    <div className="hidden md:block w-80 bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Events panel content */}
    </div>
  ) : null;
}
