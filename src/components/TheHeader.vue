<template lang='pug'>
header.header
  .hcontainer.mx-auto(class='w-11/12 lg:w-4/5')
    .header__logo.logo.flex.items-center
      a.logo__link(href='#')
        img.logo__img(src='../assets/logo.png' alt='Логотип Компании Стикер')
      svg.svg-triangle.header-triangle
        rect(width='110' height='100%')
    .header__content
      .header__contacts.flex.flex-col(class='gg:flex-row')
        .header__contacts-item.header__address
          img.header-icon(src='../assets/addr-icon.png' alt='')
          span Первомайская, 78
        .header__contacts-item.header__email
          img.header-icon(src='../assets/email-icon.png' alt='')
          a.header__email-link(href='mailto:sticker11@list.ru') sticker11@list.ru
        .header__contacts-item.header__phone-social
          .header__phone
            a(href='https://wa.me/+79658606425' target='_blank')
              img.header-icon(src='../assets/whatsapp.png')
            a(href='viber://chat?number=%2B79658606425')
              img(class='header-icon -ml-[5px]' src='../assets/viber.png')
            a.header__phone-link(href='tel:+79658606425') 8 (965) 860 6425
</template>

<script>
export default {
  
}
</script>

<style>

</style>