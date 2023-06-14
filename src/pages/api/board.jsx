import { ajax } from 'rxjs/ajax'

export default function getBoardList()  {

    return ajax.getJSON('/api/bbs/list');
}