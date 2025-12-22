import { getCurrentTableSession, getTableInfoById, getTodayTableSessions, startTable } from "@/lib/helper.table";
import TableStart from "./tableStart";
import TableOpen from "./tableOpen";
import Link from "next/link";
import TodayTableSession from "@/components/todayTableSession";

const page = async ({ params }: any) => {
    const paramsData = await params;
    const tableId = paramsData.tableId;
    const tableSessionOfTheDay = await getTodayTableSessions(tableId);

    const [tableInfo] = await getTableInfoById(tableId);
    const [currentTableSession] = await getCurrentTableSession(tableId);
    return (
        <div className=" p-4">

            <div className=" flex w-full gap-2 items-center justify-between">
                <p className=" text-2xl font-medium mb-4"><Link href="/">Home</Link> &gt; {tableInfo?.tableName}</p>
                <TodayTableSession tableSessionOfTheDay={tableSessionOfTheDay} />
            </div>
            {
                currentTableSession === undefined ? <TableStart tableId={tableId} /> : <TableOpen tableSessionId={currentTableSession.id} />
            }

        </div>
    );
};

export default page;