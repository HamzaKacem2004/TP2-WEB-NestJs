
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

    const token = authReq.header('auth-user');

    if (!token) {
      res.status(401).json({
        message: 'Accès refusé : token manquant',
      });
      return;
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET, {
        algorithms: ['HS256'],
      });

      if (
        typeof decoded === 'string' ||
        !decoded.userId
      ) {
        res.status(401).json({
          message: 'Accès refusé : userId manquant',
        });
        return;
      }

      authReq.userId = String(decoded.userId);

      next();

    } catch (error) {
      res.status(401).json({
        message: 'Accès refusé : token invalide ou expiré',
      });
    }
  }
}
