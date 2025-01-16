import { LeftArrowBar } from "../utils/ArrowBar";
import { DashboardReviewList } from "./DashboardReviewList";

export function DashboardReview() {
  return (
    <div className="relative flex flex-col w-full">
      <LeftArrowBar />
      <DashboardReviewList />
    </div>
  );
}
