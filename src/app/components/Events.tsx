"use client";

import React from "react";
import { useEvent } from "@/app/contexts/EventContext";

export interface EventsProps {
  isExpanded: boolean;
}

// Ce composant ne rendra plus rien - il est maintenant vide
function Events({ isExpanded }: EventsProps) {
  return null;
}

export default Events;
