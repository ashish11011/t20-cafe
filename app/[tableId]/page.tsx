import { getCurrentTableSession, getTableInfoById, startTable } from "@/lib/helper.table";
import TableStart from "./tableStart";
import TableOpen from "./tableOpen";

const page = async ({ params }: any) => {
    const paramsData = await params;
    const tableId = paramsData.tableId;
    const [tableInfo] = await getTableInfoById(tableId);
    const [currentTableSession] = await getCurrentTableSession(tableId);
    return (
        <div className=" p-4">

            <p className=" text-2xl font-medium underline mb-4">{tableInfo?.tableName}</p>
            {
                currentTableSession === undefined ? <TableStart tableId={tableId} /> : <TableOpen tableSessionId={currentTableSession.id} />
            }

        </div>
    );
};

export default page


