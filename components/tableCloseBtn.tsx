"use client"
import { closeTable } from "@/lib/helper.table"
import { Button } from "./ui/button"

export const TableCloseBtn = ({ tableSessionId }: { tableSessionId: number }) => {
    async function handleTableClose() {
        await closeTable(tableSessionId)
    }
    return <>
        <Button className=" mt-auto" variant={"destructive"} onClick={handleTableClose}>Close Table</Button>
    </>
}