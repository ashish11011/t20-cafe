"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

const TodayTableSession = ({ tableSessionOfTheDay }: { tableSessionOfTheDay: any }) => {
    let totalOfTheDay = 0;
    for (let i = 0; i < tableSessionOfTheDay.length; i++) {
        totalOfTheDay += (Number(tableSessionOfTheDay[i].totalAmount));
    }

    function formatTime(date: string | Date | null) {
        if (!date) return "--:--";
        return new Date(date).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }


    return (
        <div>
            <Dialog>
                <DialogTrigger>Rs. {totalOfTheDay}</DialogTrigger>
                <DialogContent>
                    <DialogHeader><DialogTitle>Detail of the day</DialogTitle></DialogHeader>
                    <div>
                        {
                            tableSessionOfTheDay.map((tableSession: any, idx: number) => {
                                return (
                                    <div
                                        className="flex items-center justify-between w-full py-1.5 border-y"
                                        key={idx}
                                    >
                                        <p>
                                            {idx + 1}.{" "}
                                            <span className="font-medium">
                                                {formatTime(tableSession.openedAt)}
                                            </span>
                                            {" → "}
                                            <span className="font-medium">
                                                {formatTime(tableSession.closedAt)}
                                            </span>
                                        </p>

                                        <p className="text-end font-semibold">
                                            ₹{tableSession.totalAmount}
                                        </p>
                                    </div>
                                );

                            })
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TodayTableSession;