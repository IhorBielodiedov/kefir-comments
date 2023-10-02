import {format} from "date-fns";

export function subtractHours(date: Date, numOfHours: number) {
    const dateCopy = new Date(date.getTime());

    dateCopy.setHours(dateCopy.getHours() - numOfHours);

    return dateCopy;
}

export function formatDate(dateString: string) {
    const date: Date = new Date(dateString);
    const now: Date = new Date();

    // Рассчитываем разницу во времени между датой и текущим моментом
    const difference: number = now.getTime() - date.getTime();

    if (difference < 86400000) {
        // Если разница меньше чем 24 часа (в миллисекундах)
        const formattedDistance: string = formatTimeDifference(difference);

        return formattedDistance;
    } else {
        return format(date, "dd.MM.yyyy, HH:mm:ss");
    }
}

function formatTimeDifference(milliseconds: number) {
    if (milliseconds < 0) {
        return "только что";
    }

    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return "больше 24 часов назад";
    } else if (hours > 0) {
        return `${hours} ${declOfNum(hours, ["час", "часа", "часов"])} назад`;
    } else if (minutes > 0) {
        return `${minutes} ${minutes} ${declOfNum(minutes, [
            "минуту",
            "минуты",
            "минут",
        ])}
        назад`;
    } else if (seconds > 0) {
        return `${seconds} ${declOfNum(seconds, [
            "секунду",
            "секунды",
            "секунд",
        ])} назад`;
    } else {
        return "только что";
    }
}

export const declOfNum = (number: number, words: string[]) =>
    words[
        number % 100 > 4 && number % 100 < 20
            ? 2
            : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
    ];
