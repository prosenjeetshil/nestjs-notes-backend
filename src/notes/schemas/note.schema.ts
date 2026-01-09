import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class Note extends Document {
    @Prop({required: true, trim: true})
    title: string;

    @Prop({trim: true})
    content: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);