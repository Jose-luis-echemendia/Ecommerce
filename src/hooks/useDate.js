
import { months } from "../helpers/fixedMonth";

export const useDate = (date_issued) => {

    const month = months[date_issued.substring(5, 7)];
    
    
    const date = `${month} ${date_issued.substring(8,10)}, ${date_issued.substring(0,4)}`

    return date;
};
