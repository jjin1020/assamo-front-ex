import Link from "next/link"

export default function BbsList ({bbsList = []}) {

    return (
       <>
         {bbsList.map((item, idx) => {

            return(
                <li className="flex justify-between gap-x-6 py-5" key={item.bbsSen}>
                    <div className="flex gap-x-4">
                        <div className="min-w-0 flex-auto">
                            <Link href={{ pathname: '/boards/board', query: { bbsSen: `${item.bbsSen}` } }}>
                                <p className="text-sm font-semibold leading-6 text-gray-900">({item.sortOrd}){item.bbsNae}</p>
                            </Link>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.bbsDescript}</p>
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">{item.bbsTyNae}</p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">{item.inpDt}</p>
                    </div>
                </li>
                )
            })}
       </>
    )
}