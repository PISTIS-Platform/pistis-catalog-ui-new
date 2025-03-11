<script setup>
import COSViewHeaderAlt from '@/components/city-os/COSViewHeaderAlt.vue'
import COSViewTabs from '@/components/city-os/COSViewTabs.vue'
import { ref } from 'vue'

const tabs = [
  { label: 'Impressum', value: 'impressum' },
  { label: 'Datenschutz', value: 'datenschutz' },
  { label: 'Nutzungsbedingungen', value: 'nutzungsbedingungen' },
  { label: 'Statements', value: 'statements' },
]

const currentTab = ref('impressum')
function handleTabChange(selectedTab) {
  currentTab.value = selectedTab
}
</script>

<template>
  <main>
    <COSViewHeaderAlt
      text="Willkommen in unserem Bereich für rechtliche Informationen und Datenschutz. Hier finden Sie alle wesentlichen Details zu unserem Impressum, rechtlichen Hinweisen und unserer Datenschutzerklärung. Diese Seiten dienen dazu, Ihnen Transparenz über den Betrieb unserer Website zu bieten und zu erklären, wie wir mit Ihren persönlichen Daten umgehen. "
      title="Rechtliche Informationen und Datenschutz"
    />
    <COSViewTabs
      :tabs="tabs"
      default-tab="impressum"
      @update:tab="handleTabChange"
    />
    <div v-if="currentTab === 'impressum'">
      <div class="impressum-content">
        <div class="impressum-notice">
          <p style="font-weight: bold">
            Legal Notice
          </p>
          <p>
            Alle Rechte vorbehalten. Text, Bilder, Grafiken, Sound, Animationen und Videos sowie deren Anordnung auf
            dieser Website unterliegen dem Schutz des Urheberrechts und anderer Schutzgesetze. Der Inhalt dieser Website
            darf nicht zu kommerziellen Zwecken kopiert, verbreitet, verändert oder Dritten zugänglich gemacht werden.
          </p>
          <p>
            Unsere Webseite kann Links zu Webseiten anderer Anbieter enthalten. Trotz sorgfältiger und regelmäßiger
            Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Wir haben keinerlei Einfluss auf die
            Gestaltung und die Inhalte der von uns gelinkten Seiten. Soweit Sie solche Websites besuchen wollen, sollten
            Sie die hierfür jeweils geltenden Hinweise beachten. Wir sind nicht für die Datenschutzstandards und die
            Praktiken anderer Anbieter verantwortlich. Sollten Ihnen rechtswidrige Inhalte oder Praktiken externer Links
            bekannt werden, bitten wir Sie uns umgehend in Kenntnis zu setzen.
          </p>
          <p>
            Des Weiteren verwenden wir Google Analytics, einen Webanalysedienst von Google. Google Analytics verwendet
            so genannte Cookies (kleine Textdateien), die auf Ihrem Computer gespeichert werden und die eine Analyse der
            Benutzung der Website durch Sie ermöglichen. Die durch die Cookie erzeugten Informationen über Ihre
            Benutzung dieser Homepage (einschließlich Ihrer IP-Adresse) werden an einen Server von Google in den USA
            übertragen und dort gespeichert. Google wird diese Informationen benutzen, um Ihre Nutzung der Website
            auszuwerten, um Reports über die Websiteaktivitäten für die Homepage-Betreiber zusammenzustellen und um
            weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen zu erbringen. Auch wird
            Google diese Informationen gegebenenfalls an Dritte übertragen, sofern dieses gesetzlich vorgeschrieben ist
            oder soweit Dritte diese Daten im Auftrag von Google verarbeiten. Google wird in keinem Fall Ihre IP-Adresse
            mit anderen Daten von Google in Verbindung bringen. Sie können die Installation der Cookies durch eine
            entsprechende Einstellung in Ihrer Browser-Software verhindern, wir weisen Sie jedoch darauf hin, dass Sie
            in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website in vollem Umfang nutzen können.
            Durch die Nutzung unserer Homepage erklären Sie sich mit der Bearbeitung, der über Sie erhobenen Daten durch
            Google, in der zuvor beschriebenen Art und Weise und zu dem zuvor benannten Zweck einverstanden.
          </p>
        </div>
        <div class="impressum-contact">
          <p style="text-align: center">
            Daten-Kompetenzzentrum Städte und Regionen DKSR GmbH
          </p>
          <p style="text-align: center">
            CEO Dr.-Ing. Alanus von Radecki
          </p>
          <p style="text-align: center">
            <span
              class="ui-provider ee bpe bjb ceg ceh cei cej cek cel cem cen ceo cep ceq cer ces cet ceu cev cew cex cey cez cfa cfb cfc cfd cfe cff cfg cfh cfi cfj cfk cfl"
              dir="ltr"
            >Winterfeldtstr.21 | D-10781 Berlin<br>
            </span>
          </p>
          <p style="text-align: center">
            <a href="mailto:info@dksr.city">info@dksr.city</a> | <a href="https://www.dksr.city">www.dksr.city</a>
          </p>
          <p style="text-align: center">
            Amtsgericht Charlottenburg | HRB 227659
          </p>
          <p style="text-align: center">
            USt. ID DE342267182
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
p {
  max-width: 900px !important;
}
.impressum-content {
  font-family: 'Sofia Sans', 'serif';
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  justify-content: center;
}

.impressum-notice {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
