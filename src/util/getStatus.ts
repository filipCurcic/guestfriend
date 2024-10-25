import { type Status, StatusEnum } from '../types/SharedTypes'

export const STATUSES: Record<StatusEnum, Status> = {
    [StatusEnum.TO_DO]: {
        title: 'To Do',
        headerColor: 'blue600',
        ticketColor: 'blue400',
        containerColor: 'blue200',
    },
    [StatusEnum.IN_PROGRESS]: {
        title: 'In Progress',
        headerColor: 'red600',
        ticketColor: 'red400',
        containerColor: 'red200',
    },
    [StatusEnum.DONE]: {
        title: 'Done',
        headerColor: 'blue950',
        ticketColor: 'gray400',
        containerColor: 'gray200',
    },
} as const

/**
 * __getStatus__
 *
 * Function that returns a value of the STATUSES object
 *
 * @param status value of StatusEnum
 * @returns a Status object
 *
 * @example const statusData = getStatus(status)
 *
 */

const getStatus = (status: StatusEnum) => {
    return STATUSES[status]
}

export default getStatus
