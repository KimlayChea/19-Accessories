import { useMutation } from "@tanstack/react-query";
import { customerSendMessage } from "../../../services/apiCustomerMessage";

export function useSendMessage() {
  const { isPending, mutate: sendMessage } = useMutation({
    mutationFn: customerSendMessage,
  });

  return { sendMessage, isPending };
}
