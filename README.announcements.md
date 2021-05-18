Posting announcements
---------------------

## How to post an announcement

In case there is an update or problem with the software that quickly needs to be publicised, open the markdown file `_announcements/announcement.md` and edit this file. Comments in the frontmatter explain what (meta) information and settings need to be set:

- the published state (`true` or `false`),
- the language of the announcement,
- and the title.

The content of the file is written in markdown. Unfortunately, to open links in a new browser window by default, you do have to use an HTML anchor link. 

Once the file is saved, and `published` is set to `true`, some logic in the `_layouts/home.html` folder will take care of the rest. 

## Making multiple announcements

If the circumstance occurs that there are multiple announcements to make, you can choose to copy the `announcement.md` file and edit it appropriately. *Be aware* that the announcements will be shown on the page, ordered by filename. You can use numbering in the filename.

## Translating announcements

If you want to translate an announcement, you can copy the `announcement.md` file and set the `lang` to the language code that is appropriate. 

- ar = Arabic*
- bg = Bulgarian*
- de = German*
- en = English
- es = Spanish*
- fr = French*
- fy = Frisian*
- nl = Dutch
- pl = Polish*
- ro = Romanian*
- tr = Turkish*

* not yet used/available on this website.
