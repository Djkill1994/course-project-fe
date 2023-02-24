import { useEffect, useRef } from "react";
import { IComment } from "../../features/Items/api/item.api";

export const useChatScroll = (
  dep: IComment[]
): React.MutableRefObject<HTMLDivElement | undefined> => {
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
};
