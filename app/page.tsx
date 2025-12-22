import { getTables } from "@/lib/helper.table";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const tableData = await getTables();
  return (
    <div className=" min-h-screen w-full max-w-xl border mx-auto">
      <div className=" w-full grid grid-cols-3">
        {
          tableData.map((table, idx) => {
            return <Link key={idx} href={`/${table.id}`} className=" w-full flex justify-center items-center border aspect-square">
              <p className=" text-xl">{table?.tableName}</p>
            </Link>
          })
        }
      </div>
    </div>
  );
}
