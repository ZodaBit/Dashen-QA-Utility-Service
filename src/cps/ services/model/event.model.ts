import modules from './imports/index'
import { type PaginateModel } from 'mongoose'
import { type Event } from '../config/types/event'

const Schema = modules.mongoose.Schema

const EventSchema = new Schema<Event>({
    eventCode: { type: String },
    eventName: { type: String },
    eventCover: { type: String },
    vidoLink: { type: String },
    eventDescription: { type: String },
    merchantID: { type: Schema.Types.ObjectId, ref: 'MiniAppMerchant' },
    merchantCode: { type: String },
    merchantName: { type: String },
    merchantPhone: { type: String },
    accountNumber: { type: String },
    contactPhone: { type: String },
    contactEmail: { type: String },
    eventStatus: { type: String, default: 'upcoming', enum: ['upcoming', 'live', 'completed'] },
    eventVenue: { type: String },
    venueAddress: { type: String },
    venueCoordinate: {
        longitude: { type: Number },
        latitude: { type: Number }
    },
    city: { type: String },
    eventDate: { type: Date },
    eventEndDate: { type: Date },
    isScheduled: { type: Boolean, default: false },
    scheduledDate: { type: Date },
    ticketCategories: [{
        ticketCategory: { type: String },
        ticketType: { type: String },
        ticketPrice: { type: Number },
        numberOfTickets: { type: Number }
    }],
    ticketSales: [{
        ticketCategory: { type: String },
        totalRevenue: { type: Number },
        ticketsSold: { type: Number }
    }],
    saleDateFrom: { type: Date },
    saleDateTo: { type: Date },
    refundPolicy: [{ type: String }],
    miscInfo: [{ type: Object }],
    totalNumberOfTickets: { type: Number },
    totalNumberOfRemaining: { type: Number },
    totalNumberOfAvailable: { type: Number },
    lastTicketNumber: { type: String, default: '000000' },
    assignedAttendants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date },
    lastModified: { type: Date },
    enabled: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
})

EventSchema.plugin(modules.paginator)

EventSchema.pre<Event>('save', function preSaveMiddleware(next) {
    const now = modules.moment().toDate()

    this.createdAt = now
    this.lastModified = now

    next()
})

const eventModel = modules.mongoose.model<Event, PaginateModel<Event>>(
    'Event',
    EventSchema
)

export default eventModel
