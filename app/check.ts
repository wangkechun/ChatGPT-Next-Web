"use client";

import { useEffect } from "react";
import { showToast } from "@/app/components/ui-lib";

const current = Date.now();
let showed = false;
export function Check() {
  useEffect(() => {
    const channel = new BroadcastChannel("page_open_channel");

    setInterval(() => {
      channel.postMessage({ type: "page_open", id: current });
    }, 1000);

    channel.onmessage = (event) => {
      if (
        event.data.type === "page_open" &&
        event.data.id < current &&
        !showed
      ) {
        showToast("重复打开，继续操作将导致数据不一致，请手动关闭此页面！");
        showed = true;
        window.close();
      }
    };
  }, []);
  return "";
}
