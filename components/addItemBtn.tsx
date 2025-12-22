"use client"
import { addOrderItem, getAllDishes } from "@/lib/helper.table";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";

export const AddItemBtn = ({ tableSessionId }: { tableSessionId: number }) => {
    return <>
        <AddMore tableSessionId={tableSessionId} onItemAdded={() => { }} />
    </>
}


type Dish = {
    id: number;
    name: string;
    price: number;
};

function AddMore({
    tableSessionId,
    onItemAdded,
}: {
    tableSessionId: number;
    onItemAdded: () => void;
}) {
    const [open, setOpen] = useState(false);
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [search, setSearch] = useState("");
    const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function fetchDishes() {
            if (open) {
                const data = await getAllDishes();;
                setDishes(data);
            }
        }
        fetchDishes();
    }, [open]);

    async function handleAddItem() {
        if (!selectedDish) return;

        setLoading(true);
        await addOrderItem({
            tableSessionId,
            dishId: selectedDish.id,
            priceAtOrder: selectedDish.price || 1,
            quantity,
        });

        setLoading(false);

        setSelectedDish(null);
        setQuantity(1);
        setOpen(false);
        onItemAdded();
    }

    const filtered = dishes.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
                <Plus /> Add Item
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Item</DialogTitle>
                    </DialogHeader>

                    {!selectedDish ? (
                        <>
                            <Input
                                placeholder="Search dish..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <div className="max-h-60 overflow-y-auto space-y-1">
                                {filtered.map((dish) => (
                                    <div
                                        key={dish.id}
                                        className="flex justify-between p-2 border rounded cursor-pointer hover:bg-muted"
                                        onClick={() => setSelectedDish(dish)}
                                    >
                                        <p>{dish.name}</p>
                                        <p>₹{dish.price}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="space-y-2">
                                <p className="font-semibold">{selectedDish.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    ₹{selectedDish.price} each
                                </p>

                                <div className="flex items-center gap-2">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        <Minus />
                                    </Button>

                                    <span className="w-8 text-center">{quantity}</span>

                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        <Plus />
                                    </Button>
                                </div>

                                <p className="font-semibold">
                                    Total: ₹{quantity * selectedDish.price}
                                </p>

                                <Button
                                    onClick={handleAddItem}
                                    disabled={loading}
                                    className="w-full"
                                >
                                    {loading ? "Adding..." : "Add to Order"}
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}