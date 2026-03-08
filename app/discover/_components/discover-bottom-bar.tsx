import type { ActionType } from "../_lib/discover-config";

type DiscoverBottomBarProps = {
  isEraCard: boolean;
  isFlowLocked: boolean;
  onActionTap: (type: ActionType) => () => void;
  onUndo: () => void;
  swipeHistoryCount: number;
};

export function DiscoverBottomBar({
  isEraCard,
  isFlowLocked,
  onActionTap,
  onUndo,
  swipeHistoryCount,
}: DiscoverBottomBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-6">
      <div className="mx-auto flex max-w-sm items-center justify-between gap-6 px-4 pb-2 pt-1">
        <button
          type="button"
          onClick={onUndo}
          onTouchStart={(event) => {
            event.preventDefault();
            onUndo();
          }}
          onPointerDown={(event) => {
            event.currentTarget.focus();
          }}
          disabled={swipeHistoryCount === 0}
          className={`z-50 grid place-items-center shrink-0 rounded-full border border-amber-300/35 bg-amber-300/10 p-0 text-amber-200 shadow-lg shadow-amber-300/30 backdrop-blur-lg transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-40 ${
            isEraCard ? "h-8 w-8" : "h-10 w-10"
          }`}
          aria-label="Desfazer último swipe"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={isEraCard ? "h-4 w-4" : "h-5 w-5"}
          >
            <path
              d="M3 12a9 9 0 1 1 2.635 6.364"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.8 15.8v-3.6h3.6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {isEraCard ? null : (
          <div className="grid max-w-[17.5rem] flex-1 grid-cols-3 gap-5">
            <button
              type="button"
              onTouchStart={(event) => {
                event.preventDefault();
                onActionTap("left")();
              }}
              onClick={onActionTap("left")}
              disabled={isFlowLocked}
              className="grid h-12 w-12 place-items-center rounded-full border border-rose-300/35 bg-rose-500/10 text-rose-200 shadow-lg shadow-rose-500/30 backdrop-blur-lg transition hover:scale-[1.01] disabled:scale-100 disabled:opacity-60"
              aria-label="Passei"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
              >
                <path
                  d="m18 6-12 12M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              onTouchStart={(event) => {
                event.preventDefault();
                onActionTap("super")();
              }}
              onClick={onActionTap("super")}
              disabled={isFlowLocked}
              className="grid h-12 w-12 place-items-center rounded-full border border-sky-300/35 bg-sky-500/10 text-sky-200 shadow-lg shadow-sky-500/30 backdrop-blur-lg transition hover:scale-[1.01] disabled:scale-100 disabled:opacity-60"
              aria-label="Super gostar"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
              >
                <path
                  d="m12 2.5 3.1 6.3 6.9.6-5.1 4.7 1.6 6.8L12 18.4 6 20.9l1.4-6.8-5.1-4.7 6.9-.6L12 2.5Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              onTouchStart={(event) => {
                event.preventDefault();
                onActionTap("right")();
              }}
              onClick={onActionTap("right")}
              disabled={isFlowLocked}
              className="grid h-12 w-12 place-items-center rounded-full border border-emerald-300/35 bg-emerald-500/10 text-emerald-200 shadow-lg shadow-emerald-500/30 backdrop-blur-lg transition hover:scale-[1.01] disabled:scale-100 disabled:opacity-60"
              aria-label="Gostei"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
              >
                <path
                  d="m12 21-1.3-.9C5 16.6 2 13.8 2 10.4c0-3 2.3-5.4 5.4-5.4 1.8 0 3.6.8 4.6 2.2.15.2.29.4.4.6.11-.2.25-.4.4-.6 1-1.4 2.8-2.2 4.6-2.2 3.1 0 5.4 2.4 5.4 5.4 0 3.4-3 6.2-8.7 9.7Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
