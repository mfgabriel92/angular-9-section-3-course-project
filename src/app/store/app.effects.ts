import { AuthEffects } from '../auth/store/auth.effects';
import { RecipesEffects } from '../recipes/store/recipes.effects';

export const appEffects = [AuthEffects, RecipesEffects];
