<template>
  <b-table
    bordered
    hover
    responsive
    head-variant="light"
    outlined
    sticky-header
    :fields="fields"
    :items="items"
    class="text-right"
  >
    <template #cell(symbol)="data">
      <span>{{ data.item.symbol }}</span>
    </template>
    <template #cell(persianName)="data">
      <span>{{ persianName(data.item.symbol).fa }}</span>
    </template>
    <template #cell(englishName)="data">
      <span>{{ persianName(data.item.symbol).en }}</span>
    </template>
    <template #cell(latest)="data">
      <span>{{ commafy(data.item.latest) }}</span>
    </template>
    <template #cell(dayChange)="data">
      <span v-if="data.item.higherChange" class="text-success">{{ data.item.dayChange }} %</span>
      <span v-else>{{ data.item.dayChange }} %</span>
    </template>
  </b-table>
</template>

<script>
export default {
  props: {
    fields: {
      type: Array,
      default: () => [
        {
          key: "symbol",
          label: "سمبل",
        },
        {
          key: "persianName",
          label: "نام فارسی",
        },
        {
          key: "englishName",
          label: "نام کامل انگلیسی",
        },
        {
          key: "latest",
          label: "آخرین قیمت",
        },
        {
          key: "dayChange",
          label: "تغییرات ۲۴ ساعته",
        },
      ],
    },

    items: { type: Array },
  },
  methods: {
    persianName(payload) {
      if (payload == "btc") {
        return {
          fa: "بیت کوین",
          en: "bitcoin",
        };
      }
      if (payload == "eth") {
        return {
          fa: "اتریوم",
          en: "Ethereum",
        };
      }
      if (payload == "bnb") {
        return {
          fa: "بایننس کوین",
          en: "Binance coin",
        };
      }
      if (payload == "doge") {
        return {
          fa: "دوج کوین",
          en: "Doge coin",
        };
      }
    },
    commafy(payload) {
      return Number(payload).toLocaleString();
    },
  },
};
</script>

<style scoped lang="scss">
* {
  direction: rtl;
}
</style>
