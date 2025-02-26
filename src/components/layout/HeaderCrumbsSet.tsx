"use client";
import { useHeaderTagContext } from "@/contexts/HeaderContext";
import React, { useEffect } from "react";

export const HeaderCrumbsSet = ({
  data,
}: {
  data: { id: string; name: string };
}) => {
  const { handleNames } = useHeaderTagContext();

  useEffect(() => {
    handleNames(data);
  }, [data]);

  return <></>;
};
