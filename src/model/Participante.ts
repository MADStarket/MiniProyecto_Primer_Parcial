export class Participante {
  // Atributos
  nombre: string;
  participantesExcluidos: Participante[];

  constructor() {
    // Al crear el objeto, no hay informacion
    this.nombre = '';
    this.participantesExcluidos = [];
  }
}
