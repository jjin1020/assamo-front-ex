export default function BbsList ({bbsList = []}) {

    return (
       <>
         {bbsList.map((item, idx) => {

            return(
                <li class="flex justify-between gap-x-6 py-5" key={item.bbsSen}>
                    <div class="flex gap-x-4">
                        <div class="min-w-0 flex-auto">
                            <p class="text-sm font-semibold leading-6 text-gray-900">({item.sortOrd}){item.bbsTyNae}</p>
                            <p class="mt-1 truncate text-xs leading-5 text-gray-500">{item.bbsDescript}</p>
                        </div>
                    </div>
                    <div class="hidden sm:flex sm:flex-col sm:items-end">
                        <p class="text-sm leading-6 text-gray-900">{item.bbsNae}</p>
                        <p class="mt-1 text-xs leading-5 text-gray-500">{item.inpDt}</p>
                    </div>
                </li>
                )
            })}
       </>
    )
}