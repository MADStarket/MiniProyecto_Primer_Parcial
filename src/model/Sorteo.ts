// Importamos la clase
import { Participante } from './Participante';

export class Sorteo {
  // Atributos
  organizador: string;
  organizadorParticipa: boolean;
  participantes: Participante[];
  nombreCelebracion: string;
  fechaCelebracion: string;
  presupuesto: string;

  constructor() {
    // Al crear el objeto, no hay participantes (lista vacia)
    this.participantes = [];
    // No hay datos al momento de crear el evento
    this.organizador = '';
    this.organizadorParticipa = false;
    this.nombreCelebracion = '';
    this.fechaCelebracion = '';
    this.presupuesto = '';
  }
}
