import Link from "next/link"

export default function AreaListItem ({areaList = []}) {

    return (
       <>
         {areaList.map((item, idx) => {

            return(
                <li className="flex justify-between gap-x-6 py-5" key={item.areaSen}>
                    <div className="flex gap-x-4">
                        <div className="min-w-0 flex-auto">
                            <Link href={{ pathname: '/area-mng/area-detail', query: { areaSen: `${item.areaSen}` } }}>
                                <p className="text-sm font-semibold leading-6 text-gray-900">({item.sortOrd}){item.areaNae}</p>
                            </Link>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.areaDescript}</p>
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="mt-1 text-xs leading-5 text-gray-500">{item.inpDt}</p>
                    </div>
                </li>
                )
            })}
       </>
    )
}