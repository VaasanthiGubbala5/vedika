// Maps each library "type" to the component that draws it.
import Chair from './Chair.jsx'
import Pillar from './Pillar.jsx'
import FlowerStand from './FlowerStand.jsx'
import Urn from './Urn.jsx'
import CandleStand from './CandleStand.jsx'
import GuestTable from './GuestTable.jsx'
import ArchBackdrop from './ArchBackdrop.jsx'
import PhotoCutout from './PhotoCutout.jsx'
import PhotoBackdrop from './PhotoBackdrop.jsx'
import { VelvetSofa, RoyalChair, LoungeChair, HurricaneTrio, VaseCentrepiece } from './RealModels.jsx'

export const MODELS = {
  sofa: VelvetSofa, // real model (was a simple shape in Stage 1)
  royalChair: RoyalChair,
  loungeChair: LoungeChair,
  chair: Chair,
  pillar: Pillar,
  flowerStand: FlowerStand,
  urn: Urn,
  candleStand: CandleStand,
  hurricane: HurricaneTrio,
  vase: VaseCentrepiece,
  guestTable: GuestTable,
  archBackdrop: ArchBackdrop,
  photoBackdrop: PhotoBackdrop,
  photo: PhotoCutout,
}

// Backdrop types: uploading a backdrop photo replaces any of these.
export const BACKDROP_TYPES = ['archBackdrop', 'photoBackdrop']
