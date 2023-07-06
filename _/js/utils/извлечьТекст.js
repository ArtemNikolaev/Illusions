// url - ссылка на файл с шейдером, извлекаем и возвращаем текст этого файла
export async function извлечьТекст(url) {
  return fetch(url)
    .then(ответ => ответ.text())
    .catch(console.error);
}
