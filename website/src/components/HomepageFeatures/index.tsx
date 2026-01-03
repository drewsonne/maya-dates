import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Calendar Round & Long Count',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Work with Maya calendar dates using both the 260-day Tzolkin cycle, 
        365-day Haab cycle, and the Long Count vigesimal system. Full support 
        for Calendar Round dates and conversions to Western calendars.
      </>
    ),
  },
  {
    title: 'Type-Safe & Well-Tested',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Written in TypeScript with strict typing and over 500 tests. Immutable 
        date objects, singleton pattern for efficient comparisons, and comprehensive 
        API documentation generated from source code.
      </>
    ),
  },
  {
    title: 'Date Arithmetic & Wildcards',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Perform date arithmetic with distance numbers, expand wildcard patterns 
        to generate valid date sequences, and convert between multiple correlation 
        constants (GMT, Astronomical, Martin-Skidmore).
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
