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
        return `${hours} ${pluralize(hours, "час", "часа", "часов")} назад`;
    } else if (minutes > 0) {
        return `${minutes} ${pluralize(
            minutes,
            "минуту",
            "минуты",
            "минут",
        )} назад`;
    } else if (seconds > 0) {
        return `${seconds} ${pluralize(
            seconds,
            "секунду",
            "секунды",
            "секунд",
        )} назад`;
    } else {
        return "только что";
    }
}

function pluralize(number: number, single: string, few: string, many: string) {
    if (number === 1) {
        return single;
    } else if (number >= 2 && number <= 4) {
        return few;
    } else {
        return many;
    }
}
