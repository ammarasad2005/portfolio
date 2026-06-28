'use client';

import { ExamTablePlanet } from './projects/exam-table-planet';
import { DramaGharBinaryPlanet } from './projects/drama-ghar-binary-planet';
import { HamaraRozgarNebula } from './projects/hamara-rozgar-nebula';
import { GlucoGuardStar } from './projects/glucoguard-star';
import { InternshipFinderSatellite } from './projects/internship-finder-satellite';
import { GcrFetchComet } from './projects/gcr-fetch-comet';
import { WayFinderSpeck } from './projects/wayfinder-speck';

/**
 * ProjectBodies — wrapper that renders all 7 project celestial bodies,
 * positioned along a gentle arc through 3D space (positions come from the
 * data file).
 *
 * Per phase10_3d_experience.md §1 (ProjectBodies subtree).
 */
export function ProjectBodies() {
  return (
    <group>
      <ExamTablePlanet />
      <DramaGharBinaryPlanet />
      <HamaraRozgarNebula />
      <GlucoGuardStar />
      <InternshipFinderSatellite />
      <GcrFetchComet />
      <WayFinderSpeck />
    </group>
  );
}
