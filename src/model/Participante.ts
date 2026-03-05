export class Participante {
  // Atributos
  nombre: string;
  participantesExcluidos: Participante[];

  // Constructor que puede recibir el nombre o no
  constructor(nombre?: string) {
    this.nombre = nombre || ''; // En caso de que no se mande el nombre, lo iniciamos vacio
    this.participantesExcluidos = [];
  }
}
