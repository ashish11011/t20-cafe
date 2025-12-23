import { AddItemBtn } from "@/components/addItemBtn";
import { TableCloseBtn } from "@/components/tableCloseBtn";
import { Badge } from "@/components/ui/badge";
import { closeTable, getOrdersBySessionId } from "@/lib/helper.table";

const TableOpen = ({ tableSessionId }: { tableSessionId: number, }) => {

    return (
        <div className=" h-full min-h-[80vh] space-y-2 flex flex-col justify-between gap-2">
            <div className=" space-y-2">
                <Badge variant={"secondary"} className="bg-green-500 text-white dark:bg-green-600" >Opened</Badge>
                <OrderDetails tableSessionId={tableSessionId} />
            </div>
            <TableCloseBtn tableSessionId={tableSessionId} />
        </div>
    );
};


export default TableOpen;

// Add order Items


async function OrderDetails({ tableSessionId }: { tableSessionId: number, }) {

    const orderList = tableSessionId ? await getOrdersBySessionId(tableSessionId) : [];
    let orderTotal = 0;
    for (let i = 0; i < orderList.length; i++) {
        orderTotal += orderList[i].priceAtOrder * orderList[i].quantity;
    }


    return (
        <div>
            <div className=" flex gap-2 items-center justify-between">
                <p>Total: {orderTotal}</p>
                <AddItemBtn tableSessionId={tableSessionId} />
            </div>
            <div>
                {
                    orderList.map((order: any, idx: number) => {
                        return (
                            <div className=" flex items-center gap-1 justify-between w-full py-1.5 border-y" key={idx}>
                                <p>{idx + 1}. {order.dishName} * {order.quantity}</p>
                                <p className="text-end ">{order.priceAtOrder}</p>
                            </div>
                        );
                    })
                }
            </div>
            {/* <p>{JSON.stringify(orderList)}</p> */}
        </div>
    )
}

