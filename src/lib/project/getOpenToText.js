export default openTo => {
  switch (openTo) {
    case 'no':
      return 'Глухое';
    case 'tilt':
      return 'Откидное';
    case 'toLeft':
      return 'Поворотное влево';
    case 'toRight':
      return 'Поворотное вправо';
    case 'tilt_toLeft':
      return 'Поворотно-откидное влево';
    case 'tilt_toRight':
      return 'Поворотно-откидное вправо';
    default:
      return undefined;
  }
};
