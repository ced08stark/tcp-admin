import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function TestEORow({ item, id }) {
  const router = useRouter();

  const show = () => {
    router.push(`/TestExpressionOral/${item?._id}`);
  };

  return (
    <tr
      onClick={() => show()}
      className="even:bg-gray-100 border-b dark:border-neutral-500 transition duration-300 ease-in-out hover:even:bg-white hover:bg-neutral-100 cursor-pointer"
    >
      <td className="whitespace-nowrap px-6 py-4">{id}</td>
      <td className="whitespace-nowrap px-6 py-4 bg-gray-50">
        {new Date(item?.createdAt).toDateString()}
      </td>
      <td className="whitespace-nowrap px-6 py-4">{item?.user?.email}</td>
      <td className="whitespace-nowrap px-6 py-4 bg-gray-50">
        {item?.serie?.libelle}
      </td>
      <td className="whitespace-nowrap px-6 py-4 underline">
        <Link href={`/TestExpression/${item?._id}`}>{item?._id}</Link>
      </td>
      <td className={`whitespace-nowrap px-6 py-4`}>
        <span
          className={`text-xs px-3 py-1 rounded-full ${
            item?.status == "en cours" ? "bg-green-500" : "bg-gray-900"
          } text-white`}
        >
          {item?.status}
        </span>
      </td>
    </tr>
  );
}

export default TestEORow;
