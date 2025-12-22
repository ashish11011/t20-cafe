"use client"
import { Button } from "@/components/ui/button";
import { startTable } from "@/lib/helper.table";

const TableStart = ({ tableId }: { tableId: number }) => {
    async function handleTableStart() {
        await startTable(tableId);
    }
    return (
        <div>
            <Button onClick={handleTableStart} size={'lg'} > Start Table</Button>
        </div>
    );
};

export default TableStart;