import { atom, selector } from 'recoil'
import { User } from '../../types/user'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const userState = atom<User>({
  key: 'user',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
})

export const userInitialsSelector = selector<string>({
  key: 'userInitials',
  get: ({ get }) => {
    const username = get(userState).name
    const nameParts = username.split(' ')

    if (nameParts.length === 1) {
      // If there's only one name part, return the first letter of that part twice
      return nameParts[0][0] + nameParts[0][0]
    } else if (nameParts.length > 1) {
      // If there are two or more parts, return the first letter of the first two parts
      return nameParts[0][0] + nameParts[1][0]
    } else {
      // If the username is somehow empty or undefined
      return ''
    }
  },
})

export const userIdSelector = selector<User['_id']>({
  key: 'userId',
  get: ({ get }) => {
    return get(userState)._id
  },
})

export const isUserPremiumSelector = selector<User['isPremium']>({
  key: 'isUserPremium',
  get: ({ get }) => {
    return get(userState)?.isPremium
  },
})
