# Quick Start Guide - Локальные данные вместо Contentful

## Быстрый старт

### Очистить кэш и запустить

```bash
rm -rf .cache public
npm run develop
```

## Редактирование контента

Открыть файл `src/data/content.json` и внести изменения.

### Основные секции:

- **siteInfo** - заголовок и описание главной страницы
- **contact** - контактная информация (телефоны, email, юр. данные)
- **services** - список оказываемых услуг
- **work** - этапы работы (как мы работаем)
- **about** - информация о компании
- **testing** - описание обследования

### Пример изменения контакта:

```json
{
  "contact": {
    "tel": ["+1111", "+2222"],
    "fullName": "Новое название",
    "legal": "Новые юр. данные"
  }
}
```

После изменений:
1. Сохранить файл
2. Gatsby автоматически перезагрузит страницу (в режиме develop)

## Добавление новой услуги

В файле `src/data/content.json` добавить в массив `services`:

```json
{
  "title": "Название новой услуги",
  "description": "Описание услуги"
}
```

## Структура файлов

```
src/
  data/
    content.json          ← ОСНОВНОЙ ФАЙЛ С КОНТЕНТОМ
  images/
    work/                 ← Иконки этапов работы
      icon-1.png
      icon-2.png
      icon-3.png
      icon-4.jpg
  components/
    work-icon.js          ← Компонент для иконок
  pages/
    index.js              ← Главная страница
plugins/
  gatsby-source-local-json/  ← Плагин для загрузки JSON
    gatsby-node.js
    package.json
```

## Важные команды

```bash
# Разработка
npm run develop

# Сборка для продакшна
npm run build

# Очистка кэша (при проблемах)
rm -rf .cache public
npm run develop
```

## FAQ

**Q: Изменения не отображаются?**  
A: Очистите кэш: `rm -rf .cache public && npm run develop`

**Q: Не загружаются иконки?**  
A: Запустите `./scripts/download-images.sh`

**Q: Как добавить новую иконку?**  
A: 
1. Добавить изображение в `src/images/work/`
2. Обновить компонент `work-icon.js`
3. Добавить запись в `content.json`

