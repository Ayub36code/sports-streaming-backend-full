"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let StreamingService = class StreamingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    listStreams() { return this.prisma.stream.findMany({ orderBy: { name: 'asc' } }); }
    createStream(data) { return this.prisma.stream.create({ data }); }
    updateStream(id, data) { return this.prisma.stream.update({ where: { id }, data }); }
    getEventStreams(eventId) { return this.prisma.eventStream.findMany({ where: { eventId }, include: { stream: true } }); }
    mapEventToStream(eventId, streamId, isPrimary = false) { return this.prisma.eventStream.create({ data: { eventId, streamId, isPrimary } }); }
};
exports.StreamingService = StreamingService;
exports.StreamingService = StreamingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StreamingService);
//# sourceMappingURL=streaming.service.js.map