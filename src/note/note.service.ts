import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async fetchNotes(): Promise<Note[]> {
    return this.notesRepository.find();
  }

  async fetchNoteById(id: string): Promise<Note> {
    const found = await this.notesRepository.findOne({ where: { id: id } });
    if (!found) {
      throw new NotFoundException(`Note "${id}" not found`);
    }
    return found;
  }

  async addNote(createNoteDto: CreateNoteDto): Promise<Note> {
    const { title, content, rating } = createNoteDto;
    const note = this.notesRepository.create({
      title,
      content,
      rating,
    });
    await this.notesRepository.save(note);
    return note;
  }

  async removeNote(id: string) {
    const result = await this.notesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`A note "${id}" was not found`);
    }
    return { message: 'Note successfully deleted' };
  }

  async updateNote(id: string, updateNoteDto: UpdateNoteDto) {
    const hasNote = await this.fetchNoteById(id);
    if (!hasNote) throw new Error(`A note "${id}" was not found`);
    await this.notesRepository.update(id, updateNoteDto);
  }
}
