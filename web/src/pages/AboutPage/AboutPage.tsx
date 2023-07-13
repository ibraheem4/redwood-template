import TranslatedMetaTags from 'src/components/TranslatedMetaTags'

const AboutPage = () => {
  return (
    <>
      <TranslatedMetaTags
        titleKey="AboutPage.title"
        descriptionKey="AboutPage.description"
      />

      <p className="dark:text-white">
        This site was created to demonstrate my mastery of Redwood: Look on my
        works, ye mighty, and despair!
      </p>
    </>
  )
}

export default AboutPage
