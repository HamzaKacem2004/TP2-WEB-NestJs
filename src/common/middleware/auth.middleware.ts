
import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import type { AuthenticatedRequest } from '../interfaces/authenticated-request.interface.js';

const JWT_SECRET = 'cv-manager-dev-secret-change-me';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  use(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {

    const authReq = req as AuthenticatedRequest;

    // 1. Récupérer le token depuis le header
    const token = authReq.header('auth-user');

    // 2. Vérifier que le token existe
    if (!token) {
      res.status(401).json({
        message: 'Accès refusé : token manquant',
      });
      return;
    }

    try {
      // 3. Vérifier la signature et décoder le token
      const decoded = jwt.verify(token, JWT_SECRET, {
        algorithms: ['HS256'],
      });

      // 4. Vérifier que le payload est un objet
      if (
        typeof decoded === 'string' ||
        !decoded.userId
      ) {
        res.status(401).json({
          message: 'Accès refusé : userId manquant',
        });
        return;
      }

      // 5. Injecter userId dans la requête
      authReq.userId = String(decoded.userId);

      // 6. Continuer vers le contrôleur
      next();

    } catch (error) {
      res.status(401).json({
        message: 'Accès refusé : token invalide ou expiré',
      });
    }
  }
}
