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
import AiModel from './AiModel.jsx'
import { VelvetSofa, RoyalChair, LoungeChair, HurricaneTrio, VaseCentrepiece } from './RealModels.jsx'
import { FloralCanopyMandap, TempleMandap, ModernMandap, DomeMandap } from './Mandaps.jsx'
import { CeilingDrape, SwagArch, SheerCurtains, PleatedBackdrop } from './Fabric.jsx'
import { MarigoldCurtain, JasmineCurtain, FlowerWall, FloralHoop, HydrangeaBox, PampasVase, AisleFlowers } from './Florals.jsx'
import { NeonSign, WelcomeBoard, BrassUrli, KuthuVilakku, Chandelier, FloorLanterns, Jhoola, Chhatris } from './Props.jsx'

export const MODELS = {
  // seating
  sofa: VelvetSofa,
  royalChair: RoyalChair,
  loungeChair: LoungeChair,
  chair: Chair,
  // mandaps
  floralMandap: FloralCanopyMandap,
  templeMandap: TempleMandap,
  modernMandap: ModernMandap,
  domeMandap: DomeMandap,
  // backdrops & fabric
  archBackdrop: ArchBackdrop,
  pleatedBackdrop: PleatedBackdrop,
  ceilingDrape: CeilingDrape,
  swagArch: SwagArch,
  sheerCurtains: SheerCurtains,
  // florals
  flowerStand: FlowerStand,
  urn: Urn,
  vase: VaseCentrepiece,
  marigoldCurtain: MarigoldCurtain,
  jasmineCurtain: JasmineCurtain,
  flowerWall: FlowerWall,
  floralHoop: FloralHoop,
  hydrangeaBox: HydrangeaBox,
  pampasVase: PampasVase,
  aisleFlowers: AisleFlowers,
  // props & lighting
  neonSign: NeonSign,
  welcomeBoard: WelcomeBoard,
  urli: BrassUrli,
  kuthuVilakku: KuthuVilakku,
  chandelier: Chandelier,
  lanterns: FloorLanterns,
  jhoola: Jhoola,
  chhatris: Chhatris,
  hurricane: HurricaneTrio,
  candleStand: CandleStand,
  // structure & tables
  pillar: Pillar,
  guestTable: GuestTable,
  // from photos
  photoBackdrop: PhotoBackdrop,
  photo: PhotoCutout,
  aiModel: AiModel,
}

// Backdrop types: uploading a backdrop photo replaces any of these.
export const BACKDROP_TYPES = ['archBackdrop', 'photoBackdrop', 'pleatedBackdrop']
