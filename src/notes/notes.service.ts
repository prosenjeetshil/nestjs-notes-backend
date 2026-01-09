import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './schemas/note.schema';
import { Model } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name)
    private readonly noteModel: Model<Note>,
  ) {}

  async create(dto: CreateNoteDto) {
    return this.noteModel.create(dto);
  }

  async findAll() {
    return this.noteModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const note = await this.noteModel.findById(id);
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  async update(id: string, dto: UpdateNoteDto) {
    const note = await this.noteModel.findByIdAndUpdate(id, dto, { new: true });
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  async remove(id: string) {
    const note = await this.noteModel.findByIdAndDelete(id);
    if (!note) throw new NotFoundException('Note not found');
    return { message: 'Note deleted successfully' };
  }
}
