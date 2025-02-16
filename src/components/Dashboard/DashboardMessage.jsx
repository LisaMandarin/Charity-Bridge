import { MessageList } from "./DashboardMessageList";
import { LeftArrowBar } from "../utils/ArrowBar";

export function DashboardMessage() {
  return (
    <div className="relative flex flex-col w-full">
      <LeftArrowBar />
      <div className="flex flex-row gap-4 justify-center">
        <MessageList />
      </div>
    </div>
  );
}
